import { notification } from "../../db/prisma";
import { Logger } from "../../app/util/logger";
import { NotificationRepository } from "../repository/notification.repository";

export class NotificationService {
  private logger: Logger;
  public notificationRepository: NotificationRepository;

  public constructor() {
    this.logger = new Logger();
    this.notificationRepository = new NotificationRepository;
  }

  public async findById(id: string): Promise<notification> {
    this.logger.info(`NotificationService getting notification with id ${id}.`)
    const potentialNotification = await this.notificationRepository.findById(id)
    if (potentialNotification) {
      return potentialNotification;
    } else {
      this.logger.error(`Notification with id ${id} not found in repository.`);
      throw Error(`Notification with id ${id} not found`)
    }
  }

  public async findAllForUser(user_id: string) {
    this.logger.info(`NotificationService getting all notification for user with id ${user_id}.`)

    return await this.notificationRepository.findAllByUserId(user_id);

  }
}