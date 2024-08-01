// src/interfaces/Pin.ts
export interface Pin {
  id?: string;
  title: string;
  text: string;
  userId: string;
  tags: string[];
  source: string; 
  createdAt: string; 
  public: boolean;
}
