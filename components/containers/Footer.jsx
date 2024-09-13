import React from "react";
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
import Logo from "./Navbar/Logo";

export default function Footer({
  blog_list,
  categories,
  copyright,
  footer_text,
  logo,
  imagePath,
}) {
  return (
    <div className="flex items-center flex-col mt-16">
      <FullContainer className="bg-purple-50 py-16">
        <Container>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <Logo logo={logo} imagePath={imagePath} />
              <p className="mt-6 text-sm">{footer_text}</p>
            </div>
            <div>
              <p className="text-lg font-semibold">Follow Us</p>
              <div className="grid gird-cols-1 md:grid-cols-2 gap-2 mt-5 text-white">
                <Social
                  Icon={Facebook}
                  title="Facebook"
                  className="bg-blue-700"
                  href="https://www.facebook.com/yourPage"
                />
                <Social
                  Icon={Twitter}
                  title="Twitter"
                  className="bg-blue-500"
                  href="https://www.twitter.com/yourHandle" // Update this link with your Twitter URL
                />
                <Social
                  Icon={MessageCircleIcon}
                  title="Pinterest"
                  className="bg-rose-600"
                  href="https://www.pinterest.com/yourPage" // Update this link with your Pinterest URL
                />
                <Social
                  Icon={Youtube}
                  title="Youtube"
                  className="bg-red-600"
                  href="https://www.youtube.com/yourChannel" // Update this link with your YouTube URL
                />
                <Social
                  Icon={VoicemailIcon}
                  title="Vimeo"
                  className="bg-sky-500"
                  href="https://www.vimeo.com/yourPage" // Update this link with your Vimeo URL
                />
                <Social
                  Icon={Linkedin}
                  title="LinkedIn"
                  className="bg-sky-800"
                  href="https://www.linkedin.com/in/yourProfile" // Update this link with your LinkedIn URL
                />
                <Social
                  Icon={Cloud}
                  title="Soundcloud"
                  className="bg-orange-500"
                  href="https://www.soundcloud.com/yourProfile" // Update this link with your Soundcloud URL
                />
                <Social
                  Icon={Instagram}
                  title="Instagram"
                  className="bg-pink-600"
                  href="https://www.instagram.com/yourProfile" // Update this link with your Instagram URL
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
                    href={`/${item?.article_category?.name
                      ?.toLowerCase()
                      ?.replaceAll(" ", "-")}/${item.title
                      ?.replaceAll(" ", "-")
                      ?.toLowerCase()}`}
                    title={item.imageTitle || "Title"}
                    key={index}
                  >
                    <p className="text-sm py-3 hover:text-purple-600 hover:border-purple-500 transition-all cursor-pointer border-b border-purple-200">
                      {item.title}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </Container>
      </FullContainer>
      <FullContainer className="py-10 bg-purple-200">
        <Container>
          <div className="flex items-center flex-col md:flex-row justify-between gap-2 md:gap-5 uppercase font-semibold">
            {categories?.slice(0, 3).map((item, index) => (
              <Link
                title="Categories"
                key={index}
                href={`/${item?.toLowerCase()?.replaceAll(" ", "-")}`}
                className="text-sm"
              >
                {item}
              </Link>
            ))}
            <Link title="About" href="/about" className="text-sm">
              About Us
            </Link>
            <Link title="Contact Us" href="/contact" className="text-sm">
              Contact Us
            </Link>
            <Link title="Sitemap" href="/sitemap.xml" className="text-sm">
              Sitemap
            </Link>
          </div>
          <p className="text-sm mt-5 text-center">{copyright}</p>
        </Container>
      </FullContainer>
    </div>
  );
}

function Social({ title, className, Icon, href }) {
  return (
    <Link
      title={title}
      href={href || "#"}
      className={cn(
        "py-2 px-4 text-sm font-semibold rounded-sm flex items-center gap-2",
        className
      )}
    >
      {Icon && <Icon className="w-4" />}
      {title}
    </Link>
  );
}
