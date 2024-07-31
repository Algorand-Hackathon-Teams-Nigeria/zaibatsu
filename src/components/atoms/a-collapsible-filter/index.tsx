"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ui/collapsible";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import React from "react";
import OcticonFilter16 from "~icons/octicon/filter-16.jsx";
import IconParkOutlineSearch from "~icons/icon-park-outline/search.jsx";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  children?: React.ReactNode;
  nested?: React.JSX.Element;
  withSearch?: boolean;
}

const CollapsibleFilter: React.FC<Props> = ({
  title,
  children,
  nested,
  withSearch,
  ...props
}) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      {isLargeScreen ? (
        <Collapsible>
          <div className="flex items-center justify-between mb-4">
            <div></div>
            <div className="flex flex-col md:flex-row items-center gap-2">
              {withSearch && (
                <div className="flex items-center pl-3 focus-within:ring-ring focus-within:ring-1 rounded-md bg-card">
                  <IconParkOutlineSearch />
                  <Input
                    placeholder="Search"
                    {...props}
                    className="focus-visible:ring-0 border-0"
                  />
                </div>
              )}
              {nested}
              <CollapsibleTrigger>
                <Button className="bg-card flex gap-2 hover:bg-card/50 items-center">
                  <OcticonFilter16 />
                  <span>Filter</span>
                  <span className="sr-only hidden lg:block">{title}</span>
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
          <CollapsibleContent>
            <Card className="border-none bg-background">
              <CardHeader>
                <CardDescription>{title}</CardDescription>
              </CardHeader>
              <CardContent>{children}</CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <div></div>
            <div className="flex flex-col md:flex-row items-center gap-2">
              {withSearch && (
                <div className="flex items-center pl-3 focus-within:ring-ring focus-within:ring-1 rounded-md bg-card">
                  <IconParkOutlineSearch />
                  <Input
                    placeholder="Search"
                    {...props}
                    className="focus-visible:ring-0 border-0"
                  />
                </div>
              )}
              <Button
                onClick={toggleOpen}
                className="bg-card flex gap-2 hover:bg-card/50 items-center"
              >
                <OcticonFilter16 />
                <span>Filter</span>
                <span className="sr-only">{title}</span>
              </Button>
            </div>
          </div>
          <Sheet open={isOpen} onOpenChange={toggleOpen}>
            <SheetContent>
              <Card className="border-none bg-background">
                <CardHeader>
                  <CardDescription>{title}</CardDescription>
                </CardHeader>
                <CardContent>{children}</CardContent>
              </Card>
            </SheetContent>
          </Sheet>
        </>
      )}
    </>
  );
};

export default CollapsibleFilter;
