import { AppText } from '@presentation/components/AppText/AppText';
import { COLORS } from '@shared/constants/colors';
import { cn } from '@shared/utils/cn';
import { Check } from 'lucide-react-native';
import { View } from 'react-native';
import type { ScanStep } from '../../interfaces';
import type { IScanStepperProps } from './interfaces';

const STEPS: { id: ScanStep; label: string }[] = [
  { id: 'merchant', label: 'Local' },
  { id: 'scan', label: 'Escanear' },
  { id: 'process', label: 'Processar' },
  { id: 'done', label: 'Concluído' }
];

const BULLET_SIZE = 28;

export function ScanStepper({ currentStep }: IScanStepperProps) {
  const currentIndex = STEPS.findIndex((step) => step.id === currentStep);

  return (
    <View className='flex-row px-5 pt-2 pb-8'>
      {STEPS.map((step, index) => {
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isActive = isDone || isCurrent;

        const isFirst = index === 0;
        const isLast = index === STEPS.length - 1;

        return (
          <View key={step.id} className='flex-1 items-center gap-2'>
            <View className='w-full flex-row items-center'>
              <View
                className={cn(
                  'h-px flex-1',
                  isFirst ? 'bg-transparent' : isActive ? 'bg-brand-main' : 'bg-grays-200'
                )}
              />

              <View
                className={cn(
                  'items-center justify-center rounded-full',
                  isActive ? 'bg-brand-main' : 'bg-grays-200'
                )}
                style={{ width: BULLET_SIZE, height: BULLET_SIZE }}
              >
                {isDone ? (
                  <Check size={14} color={COLORS.white} strokeWidth={3} />
                ) : (
                  <AppText
                    size='xs'
                    weight='semibold'
                    color={isCurrent ? 'inverse' : 'subtle'}
                  >
                    {index + 1}
                  </AppText>
                )}
              </View>

              <View
                className={cn(
                  'h-px flex-1',
                  isLast ? 'bg-transparent' : isDone ? 'bg-brand-main' : 'bg-grays-200'
                )}
              />
            </View>

            <AppText
              size='xs'
              weight={isCurrent ? 'semibold' : 'regular'}
              color={isCurrent ? 'strong' : 'subtle'}
            >
              {step.label}
            </AppText>
          </View>
        );
      })}
    </View>
  );
}
