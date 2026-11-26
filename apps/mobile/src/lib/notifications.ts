import * as Notifications from "expo-notifications";
import type { Href } from "expo-router";
import { router } from "expo-router";
import { useEffect } from "react";
import { z } from "zod";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const notificationDataSchema = z.object({ url: z.string() });

function isAppPath(url: string): url is Href & string {
  return url.startsWith("/");
}

function hrefFrom(response: Notifications.NotificationResponse | null | undefined) {
  const data = notificationDataSchema.safeParse(response?.notification.request.content.data);
  return data.success && isAppPath(data.data.url) ? data.data.url : null;
}

export function useNotificationRedirect() {
  const response = Notifications.useLastNotificationResponse();
  useEffect(() => {
    const href = hrefFrom(response);
    if (href !== null) router.push(href);
  }, [response]);
}
