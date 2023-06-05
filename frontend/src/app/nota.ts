import { Mensaje } from "./mensaje";

export interface Nota {
  id: number;
  name: string;
  mensajes: Mensaje[];
}
