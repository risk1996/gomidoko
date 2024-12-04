#!tsx
import Color from "color";

const args = process.argv.slice(2);
const color = Color(args[0]);

console.log("Color to invert:", color.hex());
console.log("Inverted color :", color.negate().rotate(180).hex());
