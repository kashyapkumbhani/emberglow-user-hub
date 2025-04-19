
import { BarChart2, FileUp, HardDrive, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "@/components/dashboard/ui/StatsCard";
import ProgressCard from "@/components/dashboard/ui/ProgressCard";
import AnimatedCounter from "@/components/dashboard/ui/AnimatedCounter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

const Overview = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    // Simulate loading chart data
    const data = [
      { name: "Mon", visits: 2400 },
      { name: "Tue", visits: 1398 },
      { name: "Wed", visits: 9800 },
      { name: "Thu", visits: 3908 },
      { name: "Fri", visits: 4800 },
      { name: "Sat", visits: 3800 },
      { name: "Sun", visits: 4300 },
    ];
    
    setTimeout(() => {
      setChartData(data);
    }, 500);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500">Welcome back, John Smith!</p>
        </div>
        <div>
          <div className="inline-flex items-center rounded-md bg-secondary px-3 py-1 text-sm font-medium text-primary">
            Pro Plan
            <span className="ml-1.5 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
              ACTIVE
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Visitors"
          value={<AnimatedCounter value={48563} className="text-2xl font-bold" />}
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 12, positive: true }}
          description="Total visitors this month"
        />
        <StatsCard
          title="Files Uploaded"
          value={<AnimatedCounter value={382} className="text-2xl font-bold" />}
          icon={<FileUp className="h-5 w-5" />}
          trend={{ value: 8, positive: true }}
          description="Files added this month"
        />
        <StatsCard
          title="Storage Used"
          value={<AnimatedCounter value={1.8} suffix=" GB" className="text-2xl font-bold" decimals={1} />}
          icon={<HardDrive className="h-5 w-5" />}
          description="Out of 10 GB total"
        />
        <StatsCard
          title="Traffic"
          value={<AnimatedCounter value={12.5} suffix=" GB" className="text-2xl font-bold" decimals={1} />}
          icon={<BarChart2 className="h-5 w-5" />}
          trend={{ value: 3, positive: false }}
          description="This month's bandwidth"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2 overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Traffic Overview</CardTitle>
            <Tabs defaultValue="7days">
              <TabsList className="grid w-[240px] grid-cols-3">
                <TabsTrigger value="7days">7 days</TabsTrigger>
                <TabsTrigger value="30days">30 days</TabsTrigger>
                <TabsTrigger value="90days">90 days</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              {chartData.length > 0 ? (
                <div className="flex h-full items-end justify-between gap-2 px-2">
                  {chartData.map((item, index) => (
                    <div key={index} className="group flex flex-1 flex-col items-center">
                      <div 
                        className="relative w-full rounded-t-sm bg-primary transition-all duration-300 group-hover:bg-orange-400" 
                        style={{ 
                          height: `${(item.visits / 10000) * 100}%`,
                          maxHeight: "90%",
                          minHeight: "10%"
                        }}
                      >
                        <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded bg-black/80 px-2 py-1 text-xs text-white group-hover:block">
                          {item.visits.toLocaleString()}
                        </div>
                      </div>
                      <div className="mt-2 text-xs font-medium">{item.name}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle>Resource Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ProgressCard
              title="Storage"
              value={1.8}
              max={10}
              unit=" GB"
              description="18% of your storage used"
            />
            <ProgressCard
              title="Bandwidth"
              value={12.5}
              max={100}
              unit=" GB"
              colorClass="bg-orange-400"
              description="12% of your bandwidth used"
            />
            <ProgressCard
              title="CPU Usage"
              value={22}
              max={100}
              unit="%"
              colorClass="bg-green-500"
              description="Average over last 24 hours"
            />
            <button className="mt-2 w-full rounded-md bg-secondary py-2 text-sm font-medium text-primary transition-colors hover:bg-secondary/80">
              View Detailed Reports
            </button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  title: "File uploaded", 
                  description: "logo-hero.png was uploaded to /images",
                  time: "Just now" 
                },
                { 
                  title: "Domain updated", 
                  description: "DNS settings for yourdomain.com were updated",
                  time: "2 hours ago" 
                },
                { 
                  title: "New visitor peak", 
                  description: "Your site reached 1,000 visitors today!",
                  time: "Yesterday" 
                },
                { 
                  title: "Template applied", 
                  description: "Applied 'Modern Portfolio' template to your site",
                  time: "3 days ago" 
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="relative mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                    {index < 3 && (
                      <div className="absolute left-1/2 top-8 h-full w-0.5 -translate-x-1/2 bg-secondary"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{activity.title}</h4>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle>Account Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium">John Smith</h3>
                <p className="text-sm text-gray-500">john.smith@example.com</p>
              </div>
            </div>

            <div className="rounded-md bg-orange-gradient/10 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600">Current Plan</div>
                  <div className="text-xl font-bold text-primary">Pro Plan</div>
                </div>
                <button className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary/90">
                  Upgrade
                </button>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-4 text-center text-xs">
                <div className="rounded-md bg-white p-2">
                  <div className="font-medium text-gray-500">Storage</div>
                  <div className="text-sm font-bold">10 GB</div>
                </div>
                <div className="rounded-md bg-white p-2">
                  <div className="font-medium text-gray-500">Domains</div>
                  <div className="text-sm font-bold">5</div>
                </div>
                <div className="rounded-md bg-white p-2">
                  <div className="font-medium text-gray-500">Bandwidth</div>
                  <div className="text-sm font-bold">100 GB</div>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-md p-3 transition-colors hover:bg-secondary">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">Team Members</span>
                </div>
                <span className="text-sm font-medium">3/5</span>
              </div>
              <div className="flex items-center justify-between rounded-md p-3 transition-colors hover:bg-secondary">
                <div className="flex items-center gap-3">
                  <HardDrive className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">Backup Status</span>
                </div>
                <span className="text-sm font-medium text-green-600">Active</span>
              </div>
              <div className="flex items-center justify-between rounded-md p-3 transition-colors hover:bg-secondary">
                <div className="flex items-center gap-3">
                  <BarChart2 className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">Analytics</span>
                </div>
                <span className="text-sm font-medium">Enabled</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
