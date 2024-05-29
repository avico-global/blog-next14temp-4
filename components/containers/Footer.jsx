import React from "react";
import Image from "next/image";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Cloud,
  Facebook,
  Instagram,
  Linkedin,
  MessageCircleIcon,
  Twitter,
  VoicemailIcon,
  Youtube,
} from "lucide-react";

export default function Footer({
  logo,
  footer_text,
  blog_list,
  project_id,
  copyright,
}) {
  return (
    <div className="flex items-center flex-col">
      <FullContainer className="bg-purple-950 text-white py-16">
        <Container>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <Image height={70} width={100} src={logo} alt="logo" />
              <p className="mt-6 text-white/80 text-sm">{footer_text}</p>
            </div>
            <div>
              <p className="text-lg font-semibold">Follow Us</p>
              <div className="grid gird-cols-1 md:grid-cols-2 gap-2 mt-5">
                <Social
                  Icon={Facebook}
                  title="Facebook"
                  className="bg-blue-700"
                />
                <Social
                  Icon={Twitter}
                  title="Twitter"
                  className="bg-blue-500"
                />
                <Social
                  Icon={MessageCircleIcon}
                  title="Pinterest"
                  className="bg-rose-600"
                />
                <Social Icon={Youtube} title="Youtube" className="bg-red-600" />
                <Social
                  Icon={VoicemailIcon}
                  title="Vimeo"
                  className="bg-sky-500"
                />
                <Social
                  Icon={Linkedin}
                  title="LinkedIn"
                  className="bg-sky-800"
                />
                <Social
                  Icon={Cloud}
                  title="Soundcloud"
                  className="bg-orange-500"
                />
                <Social
                  Icon={Instagram}
                  title="Instagram"
                  className="bg-pink-600"
                />
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold mb-1">Editor Picks</p>
              {blog_list
                ?.slice(-4)
                .reverse()
                .map((item, index) => (
                  <Link
                    href={
                      project_id
                        ? `/${item.title
                            ?.toLowerCase()
                            .replaceAll(" ", "-")}?${project_id}`
                        : `/${item.title?.toLowerCase().replaceAll(" ", "-")}`
                    }
                    title={item.imageTitle}
                    key={index}
                  >
                    <p className="text-sm py-3 hover:text-purple-300 transition-all cursor-pointer border-b border-white/30 text-white/80">
                      {item.title}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </Container>
      </FullContainer>
      <FullContainer className="py-10 bg-purple-800">
        <Container className="text-white">
          <div className="flex items-center flex-col md:flex-row justify-between gap-2 md:gap-5 uppercase font-semibold">
            <p className="text-sm">Disclaimer</p>
            <p className="text-sm">Write For Us</p>
            <p className="text-sm">Privacy Policy</p>
            <p className="text-sm">Contact Us</p>
            <Link href="/sitemap.xml" className="text-sm">
              Sitemap
            </Link>
          </div>
          <p className="text-sm mt-5 text-center">{copyright}</p>
        </Container>
      </FullContainer>
    </div>
  );
}

function Social({ title, className, Icon }) {
  return (
    <div
      className={cn(
        "py-2 px-4 text-sm font-semibold rounded-sm flex items-center gap-2",
        className
      )}
    >
      {Icon && <Icon className="w-4" />}
      {title}
    </div>
  );
}
