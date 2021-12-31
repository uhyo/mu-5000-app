import { useEffect } from "react";
import { useLogs } from "~/components/logs/LogsContext";
import { Area, AreaMinusMap } from "~/logic/area";

export function useAreaEntranceLog(area: AreaMinusMap) {
  const { addLog } = useLogs();

  useEffect(() => {
    addLog(`Area #${area.id} - ${area.name}`);
  }, [area.id, area.name]);
}
