import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function oldExamsPdf() {
  const router = useRouter();
  const { src } = router.query;
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let PSPDFKit;

    (async function () {
      PSPDFKit = await import("pspdfkit");

      if (PSPDFKit) {
        PSPDFKit.unload(container);
      }

      await PSPDFKit.load({
        container,
        document: `/1st/oldExams/${src}.pdf`,
        baseUrl: `${window.location.protocol}//${window.location.host}/`,
      });
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, []);

  return (
                  style={{ height: "100vh", overscrollBehaviorY: "contain" }}


  );
}
