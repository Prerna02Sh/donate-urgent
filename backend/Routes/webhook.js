const session = event.data.object;
await User.create({
    name: session.metadata.name, 
    amount: session.amount_total / 100 
});