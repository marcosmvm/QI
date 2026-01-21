import { createServiceClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// Admin user details
const ADMIN_USER_ID = "a34e21f8-71d2-48a8-a09a-09d09fd04166";
const ADMIN_EMAIL = "marcosmvm1515@gmail.com";
const ADMIN_NAME = "Marcos Matthews";

export async function GET() {
  try {
    const supabase = await createServiceClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = supabase as any;

    // Check if profiles table exists by trying to query it
    const { error: profilesError } = await sb
      .from("profiles")
      .select("id")
      .limit(1);

    if (profilesError && profilesError.message.includes("does not exist")) {
      return NextResponse.json({
        success: false,
        message: "Database tables not set up yet",
        instructions: [
          "Go to: https://supabase.com/dashboard/project/mrqectaahvxvwegxhydz/sql/new",
          "Copy contents of: supabase/schema.sql",
          "Paste and click Run",
          "Then visit this endpoint again"
        ]
      }, { status: 400 });
    }

    // Check if admin profile exists
    const { data: adminProfile, error: adminError } = await sb
      .from("profiles")
      .select("*")
      .eq("id", ADMIN_USER_ID)
      .single();

    if (adminError && adminError.code === "PGRST116") {
      // Profile doesn't exist, create it
      const { data: newProfile, error: insertError } = await sb
        .from("profiles")
        .insert({
          id: ADMIN_USER_ID,
          email: ADMIN_EMAIL,
          full_name: ADMIN_NAME,
          role: "admin"
        })
        .select()
        .single();

      if (insertError) {
        return NextResponse.json({
          success: false,
          message: "Failed to create admin profile",
          error: insertError.message
        }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: "Admin profile created",
        profile: newProfile
      });
    }

    if (adminProfile) {
      // Check if role is admin
      if (adminProfile.role !== "admin") {
        const { error: updateError } = await sb
          .from("profiles")
          .update({ role: "admin" })
          .eq("id", ADMIN_USER_ID);

        if (updateError) {
          return NextResponse.json({
            success: false,
            message: "Failed to update role",
            error: updateError.message
          }, { status: 500 });
        }

        return NextResponse.json({
          success: true,
          message: "Admin role updated",
          profile: { ...adminProfile, role: "admin" }
        });
      }

      return NextResponse.json({
        success: true,
        message: "Admin profile already exists",
        profile: adminProfile
      });
    }

    return NextResponse.json({
      success: true,
      message: "Database is set up",
      tablesExist: true
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Setup error",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
