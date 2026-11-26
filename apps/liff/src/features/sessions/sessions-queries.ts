import { liff } from "@line/liff";

import { endSession } from "#/lib/api/client.ts";
import { queryClient } from "#/lib/query.ts";

export async function signOut() {
  try {
    await endSession();
  } finally {
    queryClient.clear();
    liff.logout();
    location.reload();
  }
}
