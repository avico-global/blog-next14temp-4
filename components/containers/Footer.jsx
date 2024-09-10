import React ,  { useState,useEffect }from "react";
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
  blog_list,
  categories,
  project_id,
  copyright,
  footer_text,
  logo,
}) {
  const [hostName, setHostName] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostName(window.location.hostname);
    }
  }, []);

  return (
    <div className="flex items-center flex-col mt-16">
      <FullContainer className="bg-purple-50 py-16">
        <Container>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <Image
                title={`Logo - ${hostName}`}
                height={70}
                width={100}
                src={logo}
                alt="logo"
              />
              <p className="mt-6 text-sm">{footer_text}</p>
            </div>
            <div>
              <p className="text-lg font-semibold">Follow Us</p>
              <div className="grid gird-cols-1 md:grid-cols-2 gap-2 mt-5 text-white">
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
                        ? `/${item.article_category.name}/${item.key}?${project_id}`
                        : `/${item.article_category.name}/${item.key}`
                    }
                    title={item.imageTitle || "Title" }
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
            {categories?.map((item, index) => (
              <Link
              title="Categories"
                key={index}
                href={project_id ? `${item}?${project_id}` : `${item}`}
                className="text-sm"
              >
                {item}
              </Link>
            ))}
            <Link
            title="About"

            href="/about" className="text-sm">
              About Us
            </Link>
            <Link
            title="Contact Us"
            
            href="/contact" className="text-sm">
              Contact Us
            </Link>
            <Link
            title="Sitemap"
            
            href="/sitemap" className="text-sm">
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
    title="Social"
      href={href || ""}
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
