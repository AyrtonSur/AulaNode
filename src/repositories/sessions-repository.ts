import { Prisma, Session } from "@prisma/client";

export interface SessionsRepository {
     create(data: Prisma.SessionUncheckedCreateInput): Promise<Session>
}