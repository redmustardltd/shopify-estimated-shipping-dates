function countDown() {
        // Get the current time in Eastern Time
        const now = luxon.DateTime.local().setZone("America/New_York");
        now.setupBusiness();

        // Set the target cutoff time time to 11:30 am Eastern Time
        let targetTime = now.set({ hour: 11, minute: 30, second: 0 });

        // If the current time is after 11:30 am, set the target time to the same time on the following business day
        if (now > targetTime || now.weekday > 5) {
          targetTime = targetTime.plusBusiness({ days: 1 });
          while (targetTime.weekday > 5) {
            targetTime = targetTime.plusBusiness({ days: 1 });
          }
        }

        // Calculate the time remaining until the target time
        const remainingTime = targetTime
          .diff(now, ["hours", "minutes", "seconds"])
          .toObject();

        document.getElementById("orderBefore").innerHTML = `
         Order within ${remainingTime.hours} hours, ${remainingTime.minutes} minutes, and ${remainingTime.seconds} seconds
        `;

        // Change the delivery between dates
        let earlyDelivery = now.plusBusiness({ days: 2 });
        let lateDelivery = now.plusBusiness({ days: 3 });

        function formatDate(now) {
          return now.toLocaleString({
            weekday: "long",
            month: "long",
            day: "2-digit"
          });
        }

        document.getElementById("range").innerHTML = `
        to receive your package between ${formatDate(
          earlyDelivery
        )} and ${formatDate(lateDelivery)}.
          `;
      }

      setInterval(countDown, 1000);
