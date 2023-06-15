import { Logger } from "../../app/util/logger";
import { TrackAndTraceRepository } from "../repository/trackandtrace.repository";

interface TrackAndTraceObject {
  order_id: string;
  order_date: Date;
  status: string;
}

export class TrackAndTraceService {
  private logger: Logger;
  public trackAndTraceRepository: TrackAndTraceRepository

  public constructor() {
    this.logger = new Logger();
    this.trackAndTraceRepository = new TrackAndTraceRepository();
  }

  public async findById(id: string, verification: string): Promise<TrackAndTraceObject> {
    this.logger.info(`TrackAndTraceService getting order with Track and Trace id: ${id}.`)
    const order = await this.trackAndTraceRepository.getOrderByTrackAndTrace(id);
    if (!order) {
      this.logger.error(`Order with track-id ${id} not found in repository.`);
      return null;
    }

    if (order.extra_validation_code !== verification) {
      this.logger.error(`Order with track-id ${id} was found, but with the wrong verification number ${verification}.`);
      return null;
    }
    
    const { order_id, order_date, status } = order;
    return { order_id, order_date, status };
  }

}