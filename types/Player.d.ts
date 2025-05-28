type Player = {
  name: string;
  email: string;
  displayName?: string;
  dateBirth?: Date | string;
  photoURL?: string;
  points?: number;
  isAdmin?: boolean;
  podiums?: PlayerPodium;
};

type PlayerDTO = Player & {
  id: string;
  podiums: PlayerPodium;
};
