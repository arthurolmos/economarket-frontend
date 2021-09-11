import { useQuery } from "@apollo/client";
import { GET_NOTIFICATIONS_BY_USER } from "../graphql";

export function getNotificationsByUser(userId: string | null = null) {
  const { subscribeToMore, ...result } = useQuery(GET_NOTIFICATIONS_BY_USER, {
    variables: {
      userId,
    },
  });

  return { subscribeToMore, ...result };
}
