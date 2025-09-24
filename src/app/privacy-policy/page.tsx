
"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <AppLayout title="Privacy Policy">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Shield className="h-8 w-8 text-primary" />
            <CardTitle>Privacy Policy</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <p>
            Welcome to AdFun Rewards. We are committed to protecting your
            privacy. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you use our
            application.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We may collect information about you in a variety of ways. The
            information we may collect on the Service includes:
          </p>
          <ul>
            <li>
              <strong>Personal Data:</strong> Personally identifiable
              information, such as your name, shipping address, email address,
              and telephone number, and demographic information, such as your
              age, gender, hometown, and interests, that you voluntarily give
              to us when you register with the Service.
            </li>
            <li>
              <strong>Derivative Data:</strong> Information our servers
              automatically collect when you access the Service, such as your
              IP address, your browser type, your operating system, your access
              times, and the pages you have viewed directly before and after
              accessing the Service.
            </li>
          </ul>

          <h2>2. Use of Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with
            a smooth, efficient, and customized experience. Specifically, we
may use information collected about you via the Service to:
          </p>
          <ul>
            <li>Create and manage your account.</li>
            <li>
              Email you regarding your account or order.
            </li>
            <li>
              Enable user-to-user communications.
            </li>
            <li>
              Fulfill and manage purchases, orders, payments, and other
              transactions related to the Service.
            </li>
            <li>
              Generate a personal profile about you to make future visits to
              the Service more personalized.
            </li>
          </ul>

          <h2>3. Disclosure of Your Information</h2>
          <p>
            We may share information we have collected about you in certain
            situations. Your information may be disclosed as follows:
          </p>
          <ul>
            <li>
              <strong>By Law or to Protect Rights:</strong> If we believe the
              release of information about you is necessary to respond to legal
              process, to investigate or remedy potential violations of our
              policies, or to protect the rights, property, and safety of
              others, we may share your information as permitted or required by
              any applicable law, rule, or regulation.
            </li>
          </ul>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
