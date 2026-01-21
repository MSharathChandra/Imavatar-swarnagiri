export type TabKey = "dharshans" | "sevas";

export type Service = {
  id: string;
  name: string;
  time: string;
  price: number;
  kind: TabKey; // helps summary label
  notes?: string;
};

export type Booking = {
  date: string;
  slot: string;
  devoteesCount: number;
  hundi: number;
};

export type Devotee = {
  fullName: string;
  age: string;
  gender: string;
  gothram: string;
  mobile: string;
  aadhaar: string;
  address: string;
};
