import { ISong } from "../types/song";
export class SongDal {
  public map: Map<string, ISong> = new Map<string, ISong>();
  constructor() {
    this.map.set("1", {
      id: 1,
      link: "/songs/Ironic.mp3",
      name: "Ironic",
      playTimeSecs: 189
    });
    this.map.set("2", {
      id: 2,
      link: "/songs/test.mp3",
      name: "Test",
      playTimeSecs: 220
    });
  }

  public getSongById(id: string): ISong {
    for (let [key, value] of this.map) {
      if (key === id) {
        return value;
      }
    }
    return null;
  }
}
