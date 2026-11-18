import { FlashList } from "@shopify/flash-list";
import { Text, View } from "react-native";

import { notesQuery } from "#/features/notes/notes-queries.ts";
import { formatDateTime } from "#/lib/format.ts";
import { t } from "#/lib/i18n.ts";
import { useSuspenseInfiniteQuery } from "#/lib/query.ts";

export function NotesList() {
  const { data, fetchNextPage, hasNextPage, refetch, isRefetching } = useSuspenseInfiniteQuery(notesQuery());
  return (
    <FlashList
      data={data.pages.flatMap((page) => page.items)}
      keyExtractor={(note) => note.id}
      onEndReached={() => {
        if (hasNextPage) void fetchNextPage();
      }}
      onRefresh={() => void refetch()}
      refreshing={isRefetching}
      ListEmptyComponent={<Text className="text-muted-foreground p-4">{t("notes.empty")}</Text>}
      renderItem={({ item }) => (
        <View className="rounded-card border-border mx-4 my-1 border p-3">
          <Text className="text-foreground font-medium">{item.title}</Text>
          <Text className="text-muted-foreground text-xs">
            {t("notes.updatedAt", { time: formatDateTime(item.updatedAt) })}
          </Text>
        </View>
      )}
    />
  );
}
