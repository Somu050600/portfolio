"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function ComponentsShowcase() {
  return (
    <div className="space-y-6 p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Buttons</h3>
        <div className="flex flex-wrap gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Inputs</h3>
        <div className="flex flex-col gap-2">
          <Input placeholder="Placeholder text" />
          <Input placeholder="Disabled" disabled />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Badges</h3>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Cards</h3>
        <Card className="max-w-sm">
          <CardHeader className="pb-2">
            <h4 className="text-sm font-medium">Card title</h4>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Card content with some example text to show how the theme applies.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
