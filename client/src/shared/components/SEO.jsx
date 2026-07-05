import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const siteUrl = "https://ariseapp.vercel.app";
const defaultTitle = "Arise | Productivity App for Focus, Tasks & Team Collaboration";
const defaultDescription =
  "ARISE helps you beat procrastination with task management, collaborative rooms, real-time chat, and a global productivity leaderboard.";

const routeMeta = {
  "/": {
    title: "Arise | Productivity App for Focus, Tasks & Team Collaboration",
    description:
      "ARISE is a modern productivity app that helps you stay focused, organize tasks, and grow with your team through collaborative rooms and leaderboards.",
  },
  "/login": {
    title: "Login to Arise | Continue your productivity journey",
    description:
      "Sign in to Arise to manage your tasks, join rooms, and keep your productivity streak alive.",
  },
  "/signup": {
    title: "Create an Arise Account | Join the productivity community",
    description:
      "Create your Arise account and start building better habits, tracking progress, and collaborating with your team.",
  },
  "/home": {
    title: "Arise Dashboard | Manage tasks and stay productive",
    description:
      "Welcome to your Arise dashboard where you can track goals, manage tasks, and stay motivated every day.",
  },
  "/task-list": {
    title: "Arise Task List | Organize your priorities",
    description:
      "Build your daily plan with Arise task management, clear priorities, and a focused workflow that helps you stay on track.",
  },
  "/room": {
    title: "Arise Rooms | Collaborate with your team",
    description:
      "Create or join collaborative rooms in Arise to share progress, assign tasks, and communicate in real time.",
  },
  "/world-rank": {
    title: "Arise Leaderboard | See your global productivity rank",
    description:
      "Climb the Arise leaderboard, compare your progress, and stay motivated with friends and users around the world.",
  },
  "/aboutus": {
    title: "About Arise | The story behind the productivity app",
    description:
      "Learn more about Arise, its mission, and the team building a productivity platform focused on consistency and accountability.",
  },
  "/contactus": {
    title: "Contact Arise | Reach the team",
    description:
      "Get in touch with the Arise team for questions, feedback, or support about your productivity experience.",
  },
};

function setMetaTag(attributes) {
  const { tag, attrName, attrValue, content } = attributes;
  let element = document.querySelector(`${tag}[${attrName}="${attrValue}"]`);

  if (!element) {
    element = document.createElement(tag);
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function SEO() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const currentMeta = routeMeta[pathname] || null;
    const title = currentMeta?.title || defaultTitle;
    const description = currentMeta?.description || defaultDescription;
    const canonicalUrl = pathname === "/" ? siteUrl : `${siteUrl}${pathname}`;

    document.title = title;

    setMetaTag({
      tag: "meta",
      attrName: "name",
      attrValue: "description",
      content: description,
    });
    setMetaTag({
      tag: "meta",
      attrName: "name",
      attrValue: "robots",
      content: "index, follow, max-image-preview:large",
    });
    setMetaTag({
      tag: "meta",
      attrName: "property",
      attrValue: "og:title",
      content: title,
    });
    setMetaTag({
      tag: "meta",
      attrName: "property",
      attrValue: "og:description",
      content: description,
    });
    setMetaTag({
      tag: "meta",
      attrName: "property",
      attrValue: "og:type",
      content: "website",
    });
    setMetaTag({
      tag: "meta",
      attrName: "property",
      attrValue: "og:url",
      content: canonicalUrl,
    });
    setMetaTag({
      tag: "meta",
      attrName: "property",
      attrValue: "og:image",
      content: `${siteUrl}/og-image.png`,
    });
    setMetaTag({
      tag: "meta",
      attrName: "property",
      attrValue: "og:site_name",
      content: "Arise",
    });
    setMetaTag({
      tag: "meta",
      attrName: "name",
      attrValue: "twitter:card",
      content: "summary_large_image",
    });
    setMetaTag({
      tag: "meta",
      attrName: "name",
      attrValue: "twitter:title",
      content: title,
    });
    setMetaTag({
      tag: "meta",
      attrName: "name",
      attrValue: "twitter:description",
      content: description,
    });
    setMetaTag({
      tag: "meta",
      attrName: "name",
      attrValue: "twitter:image",
      content: `${siteUrl}/og-image.png`,
    });
    setMetaTag({
      tag: "meta",
      attrName: "name",
      attrValue: "theme-color",
      content: "#0f172a",
    });

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);
  }, [location.pathname]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Arise",
          url: siteUrl,
          applicationCategory: "ProductivityApplication",
          operatingSystem: "Web",
          description: defaultDescription,
          offers: {
            "@type": "Offer",
            category: "Productivity and focus tools",
          },
          author: {
            "@type": "Organization",
            name: "Dynamos Dev",
          },
        }),
      }}
    />
  );
}

export default SEO;
