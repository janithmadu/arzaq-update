import React, { useEffect, useState } from "react";
import CategoryBar from "./CategoryBar";

import { cookies } from "next/headers";

async function CategorySection() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";

  return (
    <div>
      <CategoryBar CurrentLocal={locale} categorytitle="sdf" t="dfsdf" />
    </div>
  );
}

export default CategorySection;
