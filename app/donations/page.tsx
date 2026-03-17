"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DONATION_CAMPAIGNS, MEMBERSHIP_TIERS } from "@/lib/data/mock";
import { formatCurrency } from "@/lib/utils";

const PRESET_AMOUNTS = [21, 51, 108, 251, 501, 1001];

export default function DonationsPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(108);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState(
    DONATION_CAMPAIGNS[0].id
  );

  const donationAmount = customAmount
    ? parseFloat(customAmount)
    : selectedAmount;

  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      {/* Hero */}
      <section
        className="relative pt-32 pb-20 text-white"
        style={{
          background:
            "linear-gradient(135deg, #3d0a0a 0%, #8b1a1a 50%, #c9a227 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4" style={{ color: "#f0c040" }}>
            💛
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Support Our Temple
          </h1>
          <p className="text-stone-200 text-xl max-w-2xl mx-auto">
            Your generous donations help us build, maintain, and grow a vibrant
            temple community for generations to come.
          </p>
          <div
            className="mt-6 inline-block px-5 py-2 rounded-full text-sm font-medium"
            style={{ backgroundColor: "#f0c040", color: "#3d0a0a" }}
          >
            501(c)(3) Non-Profit — All Donations Tax Deductible
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
            className="w-full h-12 fill-[#fdfcf8]"
          >
            <path d="M0,30 C400,60 800,0 1200,30 L1200,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Active Campaigns */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#8b1a1a] mb-3">
              Active Campaigns
            </h2>
            <p className="text-stone-500 text-lg">
              Choose a campaign to direct your donation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {DONATION_CAMPAIGNS.map((campaign) => {
              const progress = Math.round(
                (campaign.raised / campaign.goal) * 100
              );
              const isSelected = selectedCampaign === campaign.id;

              return (
                <Card
                  key={campaign.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isSelected
                      ? "ring-2 ring-[#8b1a1a] shadow-md"
                      : ""
                  }`}
                  onClick={() => setSelectedCampaign(campaign.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-stone-900">
                          {campaign.title}
                        </h3>
                        {campaign.urgent && (
                          <Badge className="bg-red-100 text-red-700 border-0 text-xs">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      {isSelected && (
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
                          style={{ backgroundColor: "#8b1a1a" }}
                        >
                          ✓
                        </div>
                      )}
                    </div>

                    <Badge className="bg-stone-100 text-stone-700 border-0 text-xs mb-3">
                      {campaign.category}
                    </Badge>

                    <p className="text-stone-500 text-sm mb-4 leading-relaxed">
                      {campaign.description}
                    </p>

                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-semibold" style={{ color: "#8b1a1a" }}>
                          {formatCurrency(campaign.raised)} raised
                        </span>
                        <span className="text-stone-500">
                          of {formatCurrency(campaign.goal)}
                        </span>
                      </div>
                      <div className="w-full bg-stone-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all"
                          style={{
                            width: `${progress}%`,
                            backgroundColor: campaign.urgent
                              ? "#c9a227"
                              : "#8b1a1a",
                          }}
                        />
                      </div>
                      <div className="text-right text-xs text-stone-400 mt-1">
                        {progress}% of goal
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* One-time Donation Form */}
      <section className="py-20 px-4 bg-stone-50">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl text-[#8b1a1a]">
                Make a Donation
              </CardTitle>
              <p className="text-stone-500 text-sm mt-1">
                Donating to:{" "}
                <span className="font-medium text-stone-900">
                  {DONATION_CAMPAIGNS.find((c) => c.id === selectedCampaign)
                    ?.title}
                </span>
              </p>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              {/* Preset Amounts */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-stone-700 mb-3">
                  Select Amount
                </label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {PRESET_AMOUNTS.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount("");
                      }}
                      className={`py-3 rounded-lg font-semibold text-sm transition-all border-2 ${
                        selectedAmount === amount && !customAmount
                          ? "border-[#8b1a1a] text-white"
                          : "border-stone-200 text-stone-700 hover:border-[#8b1a1a] hover:text-[#8b1a1a]"
                      }`}
                      style={
                        selectedAmount === amount && !customAmount
                          ? { backgroundColor: "#8b1a1a" }
                          : {}
                      }
                    >
                      ${amount}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-medium">
                    $
                  </span>
                  <Input
                    type="number"
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    className="pl-7"
                    min="1"
                  />
                </div>
              </div>

              {/* Donation summary */}
              {donationAmount && donationAmount > 0 && (
                <div className="bg-stone-50 rounded-xl p-4 mb-6 border border-stone-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Donation amount</span>
                    <span className="font-semibold text-stone-900">
                      {formatCurrency(donationAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-stone-500">Tax deductible</span>
                    <span className="font-semibold text-green-600">Yes (501c3)</span>
                  </div>
                </div>
              )}

              <Button className="w-full" size="lg">
                Donate{" "}
                {donationAmount && donationAmount > 0
                  ? formatCurrency(donationAmount)
                  : "Now"}
              </Button>

              <p className="text-center text-xs text-stone-400 mt-3">
                Secure payment · Receipt sent via email · Tax deductible
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#8b1a1a] mb-3">
              Annual Membership
            </h2>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">
              Become an annual member and enjoy exclusive benefits while
              supporting the temple mission.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {MEMBERSHIP_TIERS.map((tier) => (
              <Card
                key={tier.id}
                className={`relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg ${
                  tier.featured
                    ? "ring-2 ring-[#c9a227] shadow-lg scale-105"
                    : ""
                }`}
              >
                {tier.featured && (
                  <div
                    className="absolute top-0 left-0 right-0 text-center py-1.5 text-xs font-bold uppercase tracking-wider text-white"
                    style={{ backgroundColor: "#c9a227" }}
                  >
                    Most Popular
                  </div>
                )}
                <CardContent className={`p-6 ${tier.featured ? "pt-10" : "pt-6"}`}>
                  <h3 className="text-xl font-bold text-stone-900 mb-1">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span
                      className="text-3xl font-bold"
                      style={{ color: "#8b1a1a" }}
                    >
                      ${tier.price}
                    </span>
                    <span className="text-stone-400">/{tier.period}</span>
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {tier.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span
                          className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs mt-0.5"
                          style={{ backgroundColor: "#c9a227" }}
                        >
                          ✓
                        </span>
                        <span className="text-stone-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      tier.featured ? "" : "variant-outline"
                    }`}
                    variant={tier.featured ? "default" : "outline"}
                  >
                    Join as {tier.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tax Info */}
      <section className="py-16 px-4 bg-stone-50">
        <div className="max-w-3xl mx-auto">
          <Card className="border-l-4 border-l-[#c9a227]">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="text-4xl">📋</div>
                <div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: "#8b1a1a" }}
                  >
                    Tax Deductibility Information
                  </h3>
                  <div className="space-y-3 text-stone-600 text-sm leading-relaxed">
                    <p>
                      Lakshmi Venkateswara Temple is a registered{" "}
                      <strong>501(c)(3) non-profit religious organization</strong>.
                      Our EIN (Tax ID) is:{" "}
                      <strong className="font-mono">47-1234567</strong>.
                    </p>
                    <p>
                      All monetary donations to the temple are tax-deductible to the
                      extent permitted by law. You will receive an official tax
                      receipt via email after each donation.
                    </p>
                    <p>
                      For donations over $250, you will automatically receive a
                      written acknowledgment letter that satisfies IRS requirements.
                    </p>
                    <p>
                      For year-end tax summaries or duplicate receipts, please
                      contact us at{" "}
                      <a
                        href="mailto:treasurer@lvtemple.org"
                        className="text-[#8b1a1a] underline"
                      >
                        treasurer@lvtemple.org
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
