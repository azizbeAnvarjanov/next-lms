import React from "react";
import { CardContent, Card } from "@/components/ui/card";

const AnalyticsPage = () => {
  return (
    <div className="p-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Revenue
            </div>
            <div className="text-4xl font-bold">$125,234</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              New Customers
            </div>
            <div className="text-4xl font-bold">1,234</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Conversion Rate
            </div>
            <div className="text-4xl font-bold">18.4%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Bounce Rate
            </div>
            <div className="text-4xl font-bold">32.1%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Average Order Value
            </div>
            <div className="text-4xl font-bold">$78.50</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Active Users
            </div>
            <div className="text-4xl font-bold">12,345</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Pageviews
            </div>
            <div className="text-4xl font-bold">234,567</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Transactions
            </div>
            <div className="text-4xl font-bold">1,234</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
