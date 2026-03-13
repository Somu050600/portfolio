declare module "seedrandom" {
  type SeedRandom = () => number;
  function seedrandom(seed?: string, options?: { state?: boolean }): SeedRandom;
  export = seedrandom;
}
