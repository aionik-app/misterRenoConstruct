import { promises as fs } from "fs";
import path from "path";
import type {
	AdminConfig,
	AdminSession,
	LoginAttempt,
} from "@/types/site-config";

const ADMIN_CONFIG_PATH = path.join(process.cwd(), "data", "admin-config.json");
const LOGIN_ATTEMPTS_PATH = path.join(
	process.cwd(),
	"data",
	"login-attempts.json",
);
const SESSIONS_PATH = path.join(process.cwd(), "data", "admin-sessions.json");

// Generate a secure random token
export function generateToken(): string {
	return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Hash a string (simple implementation for demo)
export function hashString(str: string): string {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash.toString();
}

// Load admin configuration
export async function loadAdminConfig(): Promise<AdminConfig> {
	try {
		const fileContents = await fs.readFile(ADMIN_CONFIG_PATH, "utf8");
		return JSON.parse(fileContents);
	} catch {
		// Return default config if file doesn't exist
		const defaultConfig: AdminConfig = {
			adminCode: "JARDIN2024",
			lastUpdated: new Date().toISOString(),
			sessionTimeout: 60, // 1 hour
			maxLoginAttempts: 5,
			lockoutDuration: 15, // 15 minutes
		};
		await saveAdminConfig(defaultConfig);
		return defaultConfig;
	}
}

// Save admin configuration
export async function saveAdminConfig(config: AdminConfig): Promise<void> {
	config.lastUpdated = new Date().toISOString();
	await fs.writeFile(
		ADMIN_CONFIG_PATH,
		JSON.stringify(config, null, 2),
		"utf8",
	);
}

// Load login attempts
export async function loadLoginAttempts(): Promise<LoginAttempt[]> {
	try {
		const fileContents = await fs.readFile(LOGIN_ATTEMPTS_PATH, "utf8");
		return JSON.parse(fileContents);
	} catch {
		return [];
	}
}

// Save login attempts
export async function saveLoginAttempts(
	attempts: LoginAttempt[],
): Promise<void> {
	await fs.writeFile(
		LOGIN_ATTEMPTS_PATH,
		JSON.stringify(attempts, null, 2),
		"utf8",
	);
}

// Load admin sessions
export async function loadAdminSessions(): Promise<AdminSession[]> {
	try {
		const fileContents = await fs.readFile(SESSIONS_PATH, "utf8");
		return JSON.parse(fileContents);
	} catch {
		return [];
	}
}

// Save admin sessions
export async function saveAdminSessions(
	sessions: AdminSession[],
): Promise<void> {
	await fs.writeFile(SESSIONS_PATH, JSON.stringify(sessions, null, 2), "utf8");
}

// Check if IP is locked out
export async function isIPLockedOut(ip: string): Promise<boolean> {
	const config = await loadAdminConfig();
	const attempts = await loadLoginAttempts();

	const recentAttempts = attempts.filter(
		(attempt) =>
			attempt.ip === ip &&
			!attempt.success &&
			new Date(attempt.timestamp).getTime() >
				Date.now() - config.lockoutDuration * 60 * 1000,
	);

	return recentAttempts.length >= config.maxLoginAttempts;
}

// Record login attempt
export async function recordLoginAttempt(
	ip: string,
	success: boolean,
): Promise<void> {
	const attempts = await loadLoginAttempts();
	const newAttempt: LoginAttempt = {
		ip,
		timestamp: new Date().toISOString(),
		success,
	};

	attempts.push(newAttempt);

	// Keep only recent attempts (last 24 hours)
	const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
	const recentAttempts = attempts.filter(
		(attempt) => new Date(attempt.timestamp).getTime() > oneDayAgo,
	);

	await saveLoginAttempts(recentAttempts);
}

// Create admin session
export async function createAdminSession(ip: string): Promise<string> {
	const config = await loadAdminConfig();
	const sessions = await loadAdminSessions();

	const token = generateToken();
	const now = new Date();
	const expiresAt = new Date(now.getTime() + config.sessionTimeout * 60 * 1000);

	const newSession: AdminSession = {
		token,
		createdAt: now.toISOString(),
		expiresAt: expiresAt.toISOString(),
		ip,
	};

	sessions.push(newSession);
	await saveAdminSessions(sessions);

	return token;
}

// Validate admin session
export async function validateAdminSession(
	token: string,
	ip: string,
): Promise<boolean> {
	const sessions = await loadAdminSessions();
	const session = sessions.find((s) => s.token === token && s.ip === ip);

	if (!session) {
		return false;
	}

	// Check if session is expired
	if (new Date(session.expiresAt).getTime() < Date.now()) {
		// Remove expired session
		const validSessions = sessions.filter((s) => s.token !== token);
		await saveAdminSessions(validSessions);
		return false;
	}

	return true;
}

// Cleanup expired sessions
export async function cleanupExpiredSessions(): Promise<void> {
	const sessions = await loadAdminSessions();
	const validSessions = sessions.filter(
		(session) => new Date(session.expiresAt).getTime() > Date.now(),
	);
	await saveAdminSessions(validSessions);
}

// Revoke admin session
export async function revokeAdminSession(token: string): Promise<void> {
	const sessions = await loadAdminSessions();
	const validSessions = sessions.filter((session) => session.token !== token);
	await saveAdminSessions(validSessions);
}

// Verify admin code
export async function verifyAdminCode(
	code: string,
	ip: string,
): Promise<{ success: boolean; token?: string; message?: string }> {
	// Check if IP is locked out
	if (await isIPLockedOut(ip)) {
		return {
			success: false,
			message: "Trop de tentatives de connexion. Veuillez réessayer plus tard.",
		};
	}

	const config = await loadAdminConfig();
	const isValid = code === config.adminCode;

	// Record the attempt
	await recordLoginAttempt(ip, isValid);

	if (isValid) {
		// Create session
		const token = await createAdminSession(ip);
		return {
			success: true,
			token,
		};
	} else {
		return {
			success: false,
			message: "Code d'accès invalide",
		};
	}
}

// Change admin code
export async function changeAdminCode(
	currentCode: string,
	newCode: string,
	ip: string,
): Promise<boolean> {
	const config = await loadAdminConfig();

	if (currentCode !== config.adminCode) {
		await recordLoginAttempt(ip, false);
		return false;
	}

	config.adminCode = newCode;
	await saveAdminConfig(config);

	// Revoke all existing sessions when code changes
	await saveAdminSessions([]);

	return true;
}
