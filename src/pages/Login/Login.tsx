import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LockKeyhole, User } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { API } from "@/redux/apis/api";
import { useToast } from "@/hooks/useToast";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");

    axios
      .post(
        API + "/login/",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        toast({
          title: "Success",
          description: "Logged in successfully",
          variant: "success",
          duration: 5000,
        });
        navigate("/home");
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Invalid credentials",
          variant: "error",
          duration: 5000,
        });
      });
  };

  return (
    <div className="min-h-screen flex-grow flex items-center justify-center bg-zinc-950 p-4">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-zinc-100">
            Welcome back
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-200">
                User Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="name@example.com"
                  className="pl-10 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-600"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-200">
                Password
              </Label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-600"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-zinc-50 text-zinc-900 hover:bg-zinc-200"
            >
              Sign in
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
