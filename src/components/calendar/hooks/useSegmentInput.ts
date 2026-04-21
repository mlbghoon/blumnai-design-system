import { useState, useRef, useCallback, useEffect, useMemo } from 'react';

export interface SegmentConfig {
  name: string;
  maxLength: number;
  placeholder: string;
  validate: (value: string) => boolean;
}

interface UseSegmentInputOptions {
  segments: SegmentConfig[];
  onComplete: (values: Record<string, string>) => void;
  onClear: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  /**
   * 외부(picker-level) 검증에서 주입하는 invalid 플래그.
   * 훅 내부의 format-level invalid 상태와 OR 합성되어 `hasInvalidDate`로 반환됩니다.
   * 예: min/max 경계 밖으로 판정된 경우 picker가 true를 전달합니다.
   */
  externalInvalid?: boolean;
}

export interface UseSegmentInputReturn {
  values: Record<string, string>;
  activeSegment: string | null;
  refs: Record<string, React.RefObject<HTMLInputElement | null>>;
  setValues: (values: Record<string, string>) => void;
  handleChange: (segmentName: string, inputValue: string) => void;
  handleKeyDown: (segmentName: string, e: React.KeyboardEvent) => void;
  handleFocus: (segmentName: string) => void;
  handleBlur: (segmentName: string) => void;
  handleAreaClick: (e: React.MouseEvent) => void;
  hasInvalidDate: boolean;
}

export function useSegmentInput({
  segments,
  onComplete,
  onClear,
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  externalInvalid,
}: UseSegmentInputOptions): UseSegmentInputReturn {
  const segmentNames = useMemo(() => segments.map(s => s.name), [segments]);
  const segmentMap = useMemo(() => {
    const map: Record<string, SegmentConfig> = {};
    segments.forEach(s => { map[s.name] = s; });
    return map;
  }, [segments]);

  const [values, setValuesState] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    segments.forEach(s => { init[s.name] = ''; });
    return init;
  });
  const valuesRef = useRef(values);
  useEffect(() => { valuesRef.current = values; }, [values]);

  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const [hasInvalidDate, setHasInvalidDate] = useState(false);

  const [refs] = useState<Record<string, React.RefObject<HTMLInputElement | null>>>(() => {
    const map: Record<string, React.RefObject<HTMLInputElement | null>> = {};
    segments.forEach(s => { map[s.name] = { current: null }; });
    return map;
  });

  const setValues = useCallback((newValues: Record<string, string>) => {
    setValuesState(newValues);
    valuesRef.current = newValues;
    setHasInvalidDate(false);
  }, []);

  const checkCompletion = useCallback((newValues: Record<string, string>) => {
    const allFilled = segments.every(s => {
      const v = newValues[s.name];
      return v && v.length === s.maxLength;
    });
    const allEmpty = segments.every(s => !newValues[s.name]);

    if (allFilled) {
      const allValid = segments.every(s => s.validate(newValues[s.name]));
      if (allValid) {
        setHasInvalidDate(false);
        onComplete(newValues);
      } else {
        setHasInvalidDate(true);
      }
      return;
    }

    setHasInvalidDate(false);
    if (allEmpty) {
      onClear();
    }
  }, [segments, onComplete, onClear]);

  const handleChange = useCallback((segmentName: string, inputValue: string) => {
    const config = segmentMap[segmentName];
    const numericValue = inputValue.replace(/\D/g, '');
    const truncatedValue = numericValue.slice(0, config.maxLength);

    const newValues = { ...valuesRef.current, [segmentName]: truncatedValue };
    setValuesState(newValues);
    valuesRef.current = newValues;

    if (truncatedValue.length === config.maxLength) {
      const currentIndex = segmentNames.indexOf(segmentName);
      if (currentIndex < segmentNames.length - 1) {
        const nextName = segmentNames[currentIndex + 1];
        setTimeout(() => {
          refs[nextName].current?.focus();
          refs[nextName].current?.select();
        }, 0);
      }
    }

    checkCompletion(newValues);
  }, [segmentMap, segmentNames, refs, checkCompletion]);

  const handleKeyDown = useCallback((segmentName: string, e: React.KeyboardEvent) => {
    const currentIndex = segmentNames.indexOf(segmentName);

    if (e.key === 'ArrowRight') {
      const input = e.currentTarget as HTMLInputElement;
      if (input.selectionStart === input.value.length && currentIndex < segmentNames.length - 1) {
        e.preventDefault();
        const nextName = segmentNames[currentIndex + 1];
        refs[nextName].current?.focus();
        refs[nextName].current?.setSelectionRange(0, 0);
      }
    } else if (e.key === 'ArrowLeft') {
      const input = e.currentTarget as HTMLInputElement;
      if (input.selectionStart === 0 && currentIndex > 0) {
        e.preventDefault();
        const prevName = segmentNames[currentIndex - 1];
        const prevRef = refs[prevName].current;
        prevRef?.focus();
        prevRef?.setSelectionRange(prevRef.value.length, prevRef.value.length);
      }
    } else if (e.key === 'Backspace' && !valuesRef.current[segmentName] && currentIndex > 0) {
      e.preventDefault();
      const prevName = segmentNames[currentIndex - 1];
      refs[prevName].current?.focus();
      refs[prevName].current?.select();
    } else if (e.key === 'Tab' && !e.shiftKey && currentIndex < segmentNames.length - 1) {
      e.preventDefault();
      const nextName = segmentNames[currentIndex + 1];
      refs[nextName].current?.focus();
      refs[nextName].current?.select();
    } else if (e.key === 'Tab' && e.shiftKey && currentIndex > 0) {
      e.preventDefault();
      const prevName = segmentNames[currentIndex - 1];
      refs[prevName].current?.focus();
      refs[prevName].current?.select();
    }
  }, [segmentNames, refs]);

  const handleFocus = useCallback((segmentName: string) => {
    setActiveSegment(segmentName);
    onFocusProp?.();
  }, [onFocusProp]);

  const handleBlur = useCallback((segmentName: string) => {
    setTimeout(() => {
      const currentValues = valuesRef.current;
      const config = segmentMap[segmentName];
      const currentVal = currentValues[segmentName];

      if (currentVal) {
        const paddedValue = currentVal.padStart(config.maxLength, '0');
        if (paddedValue !== currentVal) {
          const newValues = { ...currentValues, [segmentName]: paddedValue };
          setValuesState(newValues);
          valuesRef.current = newValues;
          checkCompletion(newValues);
        }
      }

      const isAnyFocused = segmentNames.some(
        name => refs[name].current === document.activeElement
      );
      if (!isAnyFocused) {
        setActiveSegment(null);
        onBlurProp?.();
      }
    }, 0);
  }, [segmentMap, segmentNames, refs, checkCompletion, onBlurProp]);

  const handleAreaClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeSegment) {
      const firstName = segmentNames[0];
      refs[firstName].current?.focus();
      refs[firstName].current?.select();
    }
  }, [activeSegment, segmentNames, refs]);

  return {
    values,
    activeSegment,
    refs,
    setValues,
    handleChange,
    handleKeyDown,
    handleFocus,
    handleBlur,
    handleAreaClick,
    hasInvalidDate: hasInvalidDate || (externalInvalid ?? false),
  };
}
