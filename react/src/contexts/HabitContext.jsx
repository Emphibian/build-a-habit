import { createContext, useState } from "react";

export const HabitsContext = createContext();

export function HabitsProvider({ children }) {
	return <HabitsContext value={{}}>{children}</HabitsContext>;
}
