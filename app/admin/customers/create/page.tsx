import { CreateArtistForm } from "./create-customer-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function CreatePage() {
  return (
    <div >
      <Card className="px-10 max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Create Artist</CardTitle>
          <CardDescription>
            Fill in the form to create a new artist
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateArtistForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default CreatePage;
