
"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "@/components/icons/FileText";

export default function TermsAndConditionsPage() {
  return (
    <AppLayout title="Terms & Conditions">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <FileText className="h-8 w-8 text-primary" />
            <CardTitle>Terms & Conditions</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <p>
            Please read these Terms and Conditions ("Terms", "Terms and
            Conditions") carefully before using the AdFun Rewards application
            (the "Service") operated by us.
          </p>

          <h2>1. Accounts</h2>
          <p>
            When you create an account with us, you must provide us information
            that is accurate, complete, and current at all times. Failure to do
            so constitutes a breach of the Terms, which may result in immediate
            termination of your account on our Service.
          </p>

          <h2>2. Intellectual Property</h2>
          <p>
            The Service and its original content, features and functionality
            are and will remain the exclusive property of AdFun Rewards and its
            licensors.
          </p>

          <h2>3. Links To Other Web Sites</h2>
          <p>
            Our Service may contain links to third-party web sites or services
            that are not owned or controlled by AdFun Rewards. AdFun Rewards
            has no control over, and assumes no responsibility for, the content,
            privacy policies, or practices of any third party web sites or
            services.
          </p>

          <h2>4. Termination</h2>
          <p>
            We may terminate or suspend your account immediately, without prior
            notice or liability, for any reason whatsoever, including without
            limitation if you breach the Terms.
          </p>

          <h2>5. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the
            laws of our country, without regard to its conflict of law
            provisions.
          </p>

          <h2>6. Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material we will try to
            provide at least 30 days' notice prior to any new terms taking
            effect.
          </p>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
