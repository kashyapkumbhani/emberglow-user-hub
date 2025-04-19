
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  BarChart,
  Cloud,
  Download,
  FileUp,
  LayoutPanelTop,
  PieChart,
  Users,
} from "lucide-react";
import StatsCard from "@/components/dashboard/ui/StatsCard";
import AnimatedCounter from "@/components/dashboard/ui/AnimatedCounter";

// Analytics data types
interface VisitData {
  date: string;
  value: number;
}

interface PageData {
  url: string;
  title: string;
  visits: number;
  percentage: number;
}

interface BrowserData {
  name: string;
  value: number;
  color: string;
}

interface DeviceData {
  name: string;
  value: number;
  color: string;
}

const Analytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("7days");
  
  // Sample analytics data
  const [visitData, setVisitData] = useState<VisitData[]>([]);
  const [topPages, setTopPages] = useState<PageData[]>([]);
  const [browserData, setBrowserData] = useState<BrowserData[]>([]);
  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
  
  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    
    setTimeout(() => {
      // Generate visit data for the past week
      const generateVisitData = () => {
        const days = timeRange === "7days" ? 7 : timeRange === "30days" ? 30 : 90;
        const data: VisitData[] = [];
        const now = new Date();
        
        for (let i = days - 1; i >= 0; i--) {
          const date = new Date();
          date.setDate(now.getDate() - i);
          const value = Math.floor(Math.random() * 1000) + 500;
          data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            value,
          });
        }
        
        return data;
      };
      
      setVisitData(generateVisitData());
      
      // Sample top pages
      setTopPages([
        { url: "/", title: "Homepage", visits: 3210, percentage: 42 },
        { url: "/products", title: "Products", visits: 1432, percentage: 18 },
        { url: "/about", title: "About Us", visits: 1124, percentage: 15 },
        { url: "/blog", title: "Blog", visits: 876, percentage: 12 },
        { url: "/contact", title: "Contact", visits: 543, percentage: 7 },
      ]);
      
      // Sample browser data
      setBrowserData([
        { name: "Chrome", value: 62, color: "bg-primary" },
        { name: "Firefox", value: 15, color: "bg-orange-400" },
        { name: "Safari", value: 12, color: "bg-yellow-500" },
        { name: "Edge", value: 8, color: "bg-blue-500" },
        { name: "Others", value: 3, color: "bg-gray-500" },
      ]);
      
      // Sample device data
      setDeviceData([
        { name: "Desktop", value: 58, color: "bg-primary" },
        { name: "Mobile", value: 32, color: "bg-orange-400" },
        { name: "Tablet", value: 10, color: "bg-yellow-500" },
      ]);
      
      setIsLoading(false);
    }, 1000);
  }, [timeRange]);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-gray-500">Track your site performance and visitor data</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Cloud className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download CSV
          </Button>
        </div>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">
              <LayoutPanelTop className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="visitors">
              <Users className="mr-2 h-4 w-4" />
              Visitors
            </TabsTrigger>
            <TabsTrigger value="content">
              <FileUp className="mr-2 h-4 w-4" />
              Content
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Time Range:</span>
            <select
              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
            </select>
          </div>
        </div>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <StatsCard
              title="Total Visitors"
              value={<AnimatedCounter value={48563} className="text-2xl font-bold" />}
              icon={<Users className="h-5 w-5" />}
              trend={{ value: 12, positive: true }}
              description="vs previous period"
            />
            <StatsCard
              title="Page Views"
              value={<AnimatedCounter value={132750} className="text-2xl font-bold" />}
              icon={<LayoutPanelTop className="h-5 w-5" />}
              trend={{ value: 8, positive: true }}
              description="vs previous period"
            />
            <StatsCard
              title="Avg. Session"
              value={<AnimatedCounter value={2.8} suffix=" min" className="text-2xl font-bold" decimals={1} />}
              icon={<AreaChart className="h-5 w-5" />}
              trend={{ value: 3, positive: false }}
              description="vs previous period"
            />
            <StatsCard
              title="Bounce Rate"
              value={<AnimatedCounter value={42.5} suffix="%" className="text-2xl font-bold" decimals={1} />}
              icon={<PieChart className="h-5 w-5" />}
              trend={{ value: 2, positive: true }}
              description="vs previous period"
            />
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="col-span-2 overflow-hidden transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Visitors Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex h-[300px] items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  </div>
                ) : (
                  <div className="h-[300px]">
                    {/* Bar chart visualization */}
                    <div className="flex h-full flex-col">
                      <div className="flex-1 flex items-end gap-2 px-6">
                        {visitData.map((item, index) => (
                          <div key={index} className="flex flex-1 flex-col items-center group">
                            <div className="relative w-full">
                              <div 
                                className="w-full rounded-t-sm bg-gradient-to-t from-primary to-orange-400 group-hover:from-orange-400 group-hover:to-primary transition-all duration-300" 
                                style={{ 
                                  height: `${(item.value / 1500) * 100}%`,
                                  maxHeight: "100%",
                                  minHeight: "10%",
                                  marginBottom: "8px"
                                }}
                              >
                                <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded bg-black/80 px-2 py-1 text-xs text-white group-hover:block">
                                  {item.value.toLocaleString()}
                                </div>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">{item.date}</div>
                          </div>
                        ))}
                      </div>
                      <div className="h-[1px] bg-gray-200 mt-2"></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle>Browser Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex h-[150px] items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {browserData.map((browser, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>{browser.name}</span>
                            <span className="font-medium">{browser.value}%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-gray-100">
                            <div 
                              className={`h-2 rounded-full ${browser.color} animate-fade-in`} 
                              style={{ width: `${browser.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle>Device Type</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex h-[100px] items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    </div>
                  ) : (
                    <div className="flex gap-4">
                      <div className="relative h-[100px] w-[100px]">
                        {/* Simple donut chart */}
                        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                          {deviceData.reduce(
                            (acc, device, i) => {
                              const startAngle = acc.offset;
                              const deviceAngle = (device.value / 100) * 360;
                              const endAngle = startAngle + deviceAngle;
                              
                              // Calculate SVG paths
                              const startX = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                              const startY = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                              const endX = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                              const endY = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                              
                              // Use 1 for > 180 degrees, 0 for < 180 degrees
                              const largeArcFlag = deviceAngle > 180 ? 1 : 0;
                              
                              const pathData = [
                                `M 50 50`,
                                `L ${startX} ${startY}`,
                                `A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                                `Z`,
                              ].join(" ");
                              
                              acc.paths.push(
                                <path
                                  key={i}
                                  d={pathData}
                                  className={`${device.color} transition-all duration-300 hover:opacity-80`}
                                />
                              );
                              
                              acc.offset = endAngle;
                              return acc;
                            },
                            { paths: [] as React.ReactNode[], offset: 0 }
                          ).paths}
                          {/* Inner white circle to create donut */}
                          <circle cx="50" cy="50" r="25" fill="white" />
                        </svg>
                      </div>
                      
                      <div className="flex flex-col justify-center space-y-2">
                        {deviceData.map((device, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className={`h-3 w-3 rounded-full ${device.color}`} />
                            <span className="text-xs">{device.name} ({device.value}%)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex h-[200px] items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {topPages.map((page, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{page.title}</div>
                          <div className="text-xs text-gray-500">{page.url}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{page.visits.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">visits</div>
                        </div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div 
                          className="h-2 rounded-full bg-orange-gradient animate-fade-in" 
                          style={{ width: `${page.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="visitors">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500">Additional visitor details will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500">Content performance analytics will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
