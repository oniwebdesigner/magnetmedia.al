import type { Metadata } from "next";
import PageHeader from "@/app/components/PageHeader";
import CtaBand from "@/app/components/CtaBand";
import PunetGrid from "@/app/punet/PunetGrid";
import { prisma } from "@/app/lib/prisma";

export const metadata: Metadata = {
  title: "Punët | Magnet Media",
  description: "Ide që i kemi sjellë në jetë për brande në industri të ndryshme.",
};

export const dynamic = "force-dynamic";

export default async function PunetPage() {
  const projektet = await prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      slug: true,
      client: true,
      type: true,
      category: true,
      image: true,
    },
  });

  return (
    <>
      <PageHeader
        eyebrow="Portofoli ynë"
        title="Projektet tona"
        description="Njihuni me disa nga projektet tona dhe mënyrën si i kemi ndërtuar
historitë e suksesit të markave në industri të ndryshme."
      />
      <PunetGrid projektet={projektet} />
      <CtaBand />
    </>
  );
}