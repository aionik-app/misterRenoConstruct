'use client';

import { addMonths } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, Clock, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import 'react-day-picker/style.css';
import { checkDayAvailability, formatTime, generateTimeSlots, isWorkingDay } from '@/lib/booking';
import type { BookingConfig } from '@/types/site-config';

interface DateTimePickerProps {
  config: BookingConfig;
  selectedDateTime: Date | null;
  onDateTimeChange: (date: Date) => void;
}

export function DateTimePicker({
  config,
  selectedDateTime,
  onDateTimeChange,
}: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(selectedDateTime || undefined);
  const [selectedTime, setSelectedTime] = useState<Date | null>(selectedDateTime || null);
  const [slotAvailability, setSlotAvailability] = useState<Record<string, boolean> | null>(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  const defaultClassNames = getDefaultClassNames();
  const workingDays = config.workingDays || [1, 2, 3, 4, 5];

  const disabledDays = (date: Date) => !isWorkingDay(date, workingDays);

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    setSelectedTime(null);
    setSlotAvailability(null);
    setCheckingAvailability(true);

    const now = new Date();
    const allSlots = generateTimeSlots(
      date,
      config.workingHours.start,
      config.workingHours.end,
      30
    );
    const futureSlots = allSlots.filter((slot) => slot > now);

    checkDayAvailability(config.apiUrl, config.apiKey, futureSlots, config.defaultDuration)
      .then((availability) => setSlotAvailability(availability))
      .catch(() => setSlotAvailability(null))
      .finally(() => setCheckingAvailability(false));
  };

  const handleTimeChange = (time: Date) => {
    setSelectedTime(time);
    onDateTimeChange(time);
  };

  const now = new Date();
  const timeSlots = selectedDate
    ? generateTimeSlots(
        selectedDate,
        config.workingHours.start,
        config.workingHours.end,
        30
      ).filter((slot) => slot > now)
    : [];

  const isSlotAvailable = (slot: Date): boolean => {
    if (!slotAvailability) return true;
    return slotAvailability[slot.toISOString()] ?? false;
  };

  const morningSlots = timeSlots.filter((s) => s.getHours() < 12);
  const afternoonSlots = timeSlots.filter((s) => s.getHours() >= 12);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Calendar */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#86bc42]/10 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-[#86bc42]" />
            </div>
            <h3 className="font-semibold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>Choisissez une date</h3>
          </div>
          <div className="flex justify-center lg:justify-start">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={handleDateChange}
              disabled={disabledDays}
              startMonth={new Date()}
              endMonth={addMonths(new Date(), 3)}
              locale={fr}
              classNames={{
                root: `${defaultClassNames.root} rounded-xl border border-white/10 p-4 shadow-sm`,
                months: `${defaultClassNames.months}`,
                month_caption: 'flex justify-center items-center py-2',
                caption_label: 'text-base font-semibold text-white capitalize',
                nav: `${defaultClassNames.nav}`,
                button_previous: `${defaultClassNames.button_previous} rounded-lg hover:bg-white/5 transition-colors text-white/40 hover:text-white`,
                button_next: `${defaultClassNames.button_next} rounded-lg hover:bg-white/5 transition-colors text-white/40 hover:text-white`,
                chevron: 'fill-white',
                weekdays: 'flex',
                weekday:
                  'w-10 h-10 flex items-center justify-center text-xs font-semibold text-white/60 uppercase',
                week: 'flex',
                day: 'w-10 h-10 flex items-center justify-center',
                day_button:
                  'w-9 h-9 rounded-lg text-sm font-medium transition-all hover:bg-[#86bc42]/20 hover:text-[#b8d97f] focus:outline-none focus:ring-2 focus:ring-[#86bc42]/30 text-white',
                selected: 'bg-[#86bc42] text-[#0c1a08] rounded-lg hover:bg-[#86bc42]/90 font-bold',
                today: 'font-bold text-[#b8d97f] bg-[#86bc42]/20',
                outside: 'text-white/20',
                disabled:
                  'text-white/10 cursor-not-allowed hover:bg-transparent hover:text-white/10',
                hidden: 'invisible',
              }}
              styles={{
                root: {
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                },
              }}
            />
          </div>
        </div>

        {/* Time slots */}
        {selectedDate && (
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#86bc42]/10 flex items-center justify-center">
                <Clock className="h-4 w-4 text-[#86bc42]" />
              </div>
              <h3 className="font-semibold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>Choisissez un créneau</h3>
              {checkingAvailability && (
                <span className="flex items-center gap-1.5 text-xs text-white/40 ml-auto">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Vérification…
                </span>
              )}
              {!checkingAvailability && slotAvailability && (
                <span className="text-xs text-white/40 ml-auto">
                  {Object.values(slotAvailability).filter(Boolean).length} créneau
                  {Object.values(slotAvailability).filter(Boolean).length !== 1 ? 'x' : ''}{' '}
                  disponible
                  {Object.values(slotAvailability).filter(Boolean).length !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            <div className="rounded-xl border border-white/10 p-4 shadow-sm"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="space-y-5 max-h-[360px] overflow-y-auto pr-1">
                {checkingAvailability ? (
                  <div className="space-y-3">
                    {[...Array(6)].map((_, i) => (
                      <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                        key={i}
                        className="grid grid-cols-3 gap-2"
                      >
                        {[...Array(3)].map((_, j) => (
                          <div
                            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                            key={j}
                            className="h-10 rounded-lg bg-white/5 animate-pulse"
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {morningSlots.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 flex items-center gap-2"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          Matin
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {morningSlots.map((slot) => {
                            const isSelected =
                              selectedTime && slot.getTime() === selectedTime.getTime();
                            const available = isSlotAvailable(slot);
                            return (
                              <button
                                key={slot.toISOString()}
                                type="button"
                                onClick={() => available && handleTimeChange(slot)}
                                disabled={!available}
                                title={available ? undefined : 'Créneau déjà réservé'}
                                className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#86bc42]/30 ${
                                  !available
                                    ? 'bg-white/5 border-white/5 text-white/15 line-through cursor-not-allowed'
                                    : isSelected
                                      ? 'bg-[#86bc42] text-[#0c1a08] border-[#86bc42] shadow-sm scale-[1.02]'
                                      : 'bg-transparent border-white/10 hover:border-[#86bc42]/40 hover:bg-[#86bc42]/10 hover:text-[#86bc42]'
                                }`}
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                              >
                                {formatTime(slot)}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {afternoonSlots.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 flex items-center gap-2"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          Après-midi
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {afternoonSlots.map((slot) => {
                            const isSelected =
                              selectedTime && slot.getTime() === selectedTime.getTime();
                            const available = isSlotAvailable(slot);
                            return (
                              <button
                                key={slot.toISOString()}
                                type="button"
                                onClick={() => available && handleTimeChange(slot)}
                                disabled={!available}
                                title={available ? undefined : 'Créneau déjà réservé'}
                                className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#86bc42]/30 ${
                                  !available
                                    ? 'bg-white/5 border-white/5 text-white/15 line-through cursor-not-allowed'
                                    : isSelected
                                      ? 'bg-[#86bc42] text-[#0c1a08] border-[#86bc42] shadow-sm scale-[1.02]'
                                      : 'bg-transparent border-white/10 hover:border-[#86bc42]/40 hover:bg-[#86bc42]/10 hover:text-[#86bc42]'
                                }`}
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                              >
                                {formatTime(slot)}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {timeSlots.length === 0 && (
                      <div className="text-center py-10 text-white/40 text-sm"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        Aucun créneau disponible pour cette date.
                      </div>
                    )}

                    {timeSlots.length > 0 &&
                      slotAvailability &&
                      Object.values(slotAvailability).every((v) => !v) && (
                        <div className="text-center py-4 text-sm text-white/40 bg-white/5 rounded-lg border border-dashed border-white/10"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          Tous les créneaux sont réservés pour cette journée.
                        </div>
                      )}

                    {slotAvailability && (
                      <div className="flex items-center gap-4 pt-2 border-t border-white/10 text-xs text-white/40"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded bg-[#86bc42]/20 border border-[#86bc42]/40 inline-block" />
                          Disponible
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded bg-white/5 border border-white/10 inline-block" />
                          Réservé
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {!selectedDate && (
          <div className="flex-1 flex items-center justify-center min-w-0">
            <div className="text-center py-10 px-6 rounded-xl border border-dashed border-white/10 bg-white/5">
              <Clock className="h-10 w-10 text-white/20 mx-auto mb-3" />
              <p className="text-sm text-white/40" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Sélectionnez une date pour afficher les créneaux disponibles
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
