import { useEffect } from "react";
import { useLogs } from "~/components/logs/LogsContext";
import { Area } from "~/logic/area";

export function useAreaEntranceLog(area: Area) {
  const { addLog } = useLogs();

  useEffect(() => {
    addLog(`Area #${area.id} - ${area.name}`);
  }, [area.id, area.name]);
}
