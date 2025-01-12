declare module "nprogress" {
    const NProgress: {
      start: () => void;
      done: () => void;
      configure: (options: Record<string, any>) => void;
      set: (n: number) => void; // Add the `set` method
    };
    export default NProgress;
  }
  