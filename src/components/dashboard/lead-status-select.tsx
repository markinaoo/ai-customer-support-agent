"use client";

import { useState } from "react";
import type { LeadStatus } from "@/lib/business-data";
import { Select } from "@/components/ui/input";

const statuses: LeadStatus[] = ["New", "Contacted", "Booked", "Not interested"];

export function LeadStatusSelect({
  slug,
  leadId,
  initialStatus
}: {
  slug: string;
  leadId: string;
  initialStatus: LeadStatus;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);

  async function updateStatus(nextStatus: LeadStatus) {
    setStatus(nextStatus);
    setSaving(true);

    try {
      const response = await fetch(`/api/dashboard/${slug}/leads`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          leadId,
          status: nextStatus
        })
      });

      if (!response.ok) {
        setStatus(status);
      }
    } catch {
      setStatus(status);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-1">
      <Select
        value={status}
        disabled={saving}
        onChange={(event) => void updateStatus(event.target.value as LeadStatus)}
        className="min-w-36"
      >
        {statuses.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>
      {saving ? <p className="text-xs text-muted-foreground">保存中...</p> : null}
    </div>
  );
}
