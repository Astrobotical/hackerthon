import Link from "next/link";
import { Star } from "lucide-react";
import SubscribeButton from "@/components/SubscribeButton";
import { EmbeddedFlyde } from "@/components/EmbeddedFlyde";
import { SubtleExamplePicker } from "@/components/SubtleExamplePicker";
import Head from "next/head";
import { useState } from "react";
import PlaygroundIndex from "./playground";

export default function Home() {
  const [activeExample, setActiveExample] = useState('blog-generator');

  return (
   <PlaygroundIndex/>
  );
}