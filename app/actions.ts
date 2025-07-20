"use server"

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  "https://etfyfigqlverqixzgmpm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0ZnlmaWdxbHZlcnFpeHpnbXBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MzM1MTksImV4cCI6MjA2NTUwOTUxOX0.hJYwUK7S5XJ8AZk3uc23g4-pmR6ku8-923OZ8Ml4np8",
)

export async function submitParticipation(formData: FormData) {
  try {
    const uid = formData.get("uid") as string
    const account_name = formData.get("account_name") as string
    const email = formData.get("email") as string

    // Validate required fields
    if (!uid || !account_name) {
      return { success: false, error: "UID and Account Name are required" }
    }

    // Check if UID already exists
    const { data: existingParticipant } = await supabase.from("participants").select("id").eq("uid", uid).single()

    if (existingParticipant) {
      return { success: false, error: "This UID is already registered" }
    }

    // Insert new participant
    const { error } = await supabase.from("participants").insert({
      uid,
      account_name,
      email: email || null,
    })

    if (error) {
      console.error("Supabase error:", error)
      return { success: false, error: "Failed to register participant" }
    }

    return { success: true }
  } catch (error) {
    console.error("Server error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getParticipantCount() {
  try {
    const { count, error } = await supabase.from("participants").select("*", { count: "exact", head: true })

    if (error) {
      console.error("Error fetching participant count:", error)
      return 0
    }

    return count || 0
  } catch (error) {
    console.error("Server error:", error)
    return 0
  }
}
