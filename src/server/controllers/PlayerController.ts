import { PlayerMapper } from "@/utils";
import { orderPlayersRanking } from "@/utils/orderPlayersRanking";

export class PlayerController implements Controller<PlayerDTO> {
  private playersRepository;

  constructor(playersRepository: PlayerRepository) {
    this.playersRepository = playersRepository;
  }

  index = async () => {
    const players = await this.playersRepository?.findAll?.();

    const orderedListByPoints = orderPlayersRanking(players ?? []);

    const data = orderedListByPoints.map(PlayerMapper.toDomain);

    return data;
  };

  show = async (id?: string) => {
    let player = null;

    if (id?.includes("@")) {
      player = await this.playersRepository.findByEmail?.(id as string);
    } else {
      player = await this.playersRepository?.findById?.(id as string);
    }

    if (!player) {
      return;
    }

    return PlayerMapper.toDomain(player);
  };
}
