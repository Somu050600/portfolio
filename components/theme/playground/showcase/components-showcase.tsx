"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ThemeSpec } from "@/lib/theme/schema/theme-spec";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

function ShowcaseSection({
  title,
  children,
  isGlass,
  hasNoise,
}: {
  title: string;
  children: React.ReactNode;
  isGlass?: boolean;
  hasNoise?: boolean;
}) {
  return (
    <div
      className={cn(
        "break-inside-avoid space-y-2 rounded-lg border p-4",
        isGlass ? "surface-glass" : "bg-card",
        hasNoise && "surface-noise",
      )}
    >
      <h3 className="text-sm font-semibold">{title}</h3>
      {children}
    </div>
  );
}

export function ComponentsShowcase({ theme }: { theme: ThemeSpec }) {
  const isGlass =
    theme.effects.material === "glass" ||
    theme.effects.material === "frosted" ||
    theme.effects.material === "translucent";
  const hasNoise = isGlass && theme.effects.noise.enabled;
  const hasGlow = theme.effects.glow.enabled;
  return (
    <div
      className={cn(
        "columns-1 gap-4 p-4 sm:columns-2 lg:columns-3 [&>*]:mb-4",
        isGlass && "glass-context",
      )}
    >
      <ShowcaseSection title="Buttons" isGlass={isGlass} hasNoise={hasNoise}>
        <div className="flex flex-wrap gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          {hasGlow && (
            <>
              <Button className="glow-primary">Glow primary</Button>
              <Button variant="secondary" className="glow-secondary">
                Glow secondary
              </Button>
              <Button variant="outline" className="glow-accent">
                Glow accent
              </Button>
            </>
          )}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Inputs" isGlass={isGlass} hasNoise={hasNoise}>
        <div className="flex flex-col gap-2">
          <Input placeholder="Placeholder text" />
          <Input placeholder="Disabled" disabled />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Badges" isGlass={isGlass} hasNoise={hasNoise}>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Cards" isGlass={isGlass} hasNoise={hasNoise}>
        <Card
          className={cn(
            isGlass && "surface-glass",
            hasNoise && "surface-noise",
          )}
        >
          <CardHeader className="pb-2">
            <h4 className="text-sm font-medium">Card title</h4>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Card content with example text to show theme application.
            </p>
          </CardContent>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection title="Alerts" isGlass={isGlass} hasNoise={hasNoise}>
        <div className="space-y-2">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>
              This is an informational alert message.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Something went wrong. Please try again.
            </AlertDescription>
          </Alert>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Tabs" isGlass={isGlass} hasNoise={hasNoise}>
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="mt-2">
            <p className="text-sm text-muted-foreground">Content for tab 1.</p>
          </TabsContent>
          <TabsContent value="tab2" className="mt-2">
            <p className="text-sm text-muted-foreground">Content for tab 2.</p>
          </TabsContent>
          <TabsContent value="tab3" className="mt-2">
            <p className="text-sm text-muted-foreground">Content for tab 3.</p>
          </TabsContent>
        </Tabs>
      </ShowcaseSection>

      <ShowcaseSection title="Progress" isGlass={isGlass} hasNoise={hasNoise}>
        <div className="space-y-2">
          <Progress value={60} />
          <Progress value={90} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Slider" isGlass={isGlass} hasNoise={hasNoise}>
        <Slider defaultValue={[50]} max={100} step={1} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Switch & Avatar"
        isGlass={isGlass}
        hasNoise={hasNoise}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Switch defaultChecked />
            <span className="text-sm">Toggle on</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch />
            <span className="text-sm">Toggle off</span>
          </div>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
