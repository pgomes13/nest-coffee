import { registerAs } from "@nestjs/config";

export default registerAs('coffees', () => ({
    foo: process.env.COFFEES_FOO,
    bar: process.env.COFFEES_BAR,
    baz: process.env.COFFEES_BAZ,
}));