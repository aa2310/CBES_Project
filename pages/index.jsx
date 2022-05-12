// Import required AWS SDK clients and commands for Node.js
import {
  SubscribeCommand,
  ListSubscriptionsByTopicCommand,
} from "../node_modules/@aws-sdk/client-sns";
import { snsClient } from "./api/client.js";

export default function Home({ SubscribeNumbers }) {
  async function Register() {
    const email = document.querySelector("#userEmail").value;

    const params = {
      Protocol: "email" /* required */,
      TopicArn: "arn:aws:sns:ap-south-1:901624854371:sns-try", //TOPIC_ARN
      Endpoint: email, //EMAIL_ADDRESS
    };

    try {
      const data = await snsClient.send(new SubscribeCommand(params));
      alert("Your email was successfully sign up!");
      document.querySelector("#userEmail").innerHTML = "";
      console.log("Success.", data);
      return data; // For unit tests.
    } catch (err) {
      alert("Type a valid email address!");
      console.log("Error", err.stack);
    }
  }

  return (
    <div className="main">
      <img src="images/me.png" width="80px" />
      <h1>Tech news to make your time worth</h1>
      <p>
        Be part of our community with
        <strong>
          <span id="SubscribeNumbers"> {SubscribeNumbers}</span> active readers
        </strong>
      </p>
      <input id="userEmail" type="email" placeholder="✉ Type your email" />
      <button onClick={() => Register()}>Sign up</button>
    </div>
  );
}

export async function getStaticProps() {
  // Set the parameters
  const params = {
    TopicArn: "arn:aws:sns:ap-south-1:901624854371:sns-try",
  }; //TOPIC_ARN

  const data = await snsClient.send(
    new ListSubscriptionsByTopicCommand(params)
  );
  const subs = data.Subscriptions;
  const qtd = subs.filter(function (sub) {
    return sub.SubscriptionArn === "PendingConfirmation" && "Deleted";
  });
  const SubscribeNumbers = subs.length - qtd.length;

  return {
    props: { SubscribeNumbers },
  };
}
