import { Logo } from './Logo';

export const SplashScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center justify-center flex-grow">
        <Logo className="w-28 h-28" />
      </div>
      <div className="pb-8 text-center">
        <p className="text-sm text-muted-foreground">by</p>
        <p className="text-xl font-semibold tracking-wider text-foreground">YADAVAS</p>
      </div>
    </div>
  );
};
