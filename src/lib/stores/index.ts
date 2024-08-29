import type { Motorizada } from '@prisma/client';
import { writable } from 'svelte/store';

export const selectedItems = writable<any[]>([]);
