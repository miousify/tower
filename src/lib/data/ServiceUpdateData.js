module.exports= {
    "TaskTemplate": {
        "ContainerSpec": {
            "Image": "busybox",
            "Args": [
                "top"
            ], "Env":[

            ]
        },
        "Resources": {
            "Limits": {},
            "Reservations": {}
        },
        // "RestartPolicy": {
        //     "Condition": "any",
        //     "MaxAttempts": 0
        // },
        // "Placement": {},
        "ForceUpdate": 0
    },
    "Mode": {
        "Replicated": {
            "Replicas": 1
        }
    },
    "UpdateConfig": {
        "Parallelism": 2,
        "Delay": 1000000000,
        "FailureAction": "pause",
        "Monitor": 15000000000,
        "MaxFailureRatio": 0.15
    },
    "RollbackConfig": {
        "Parallelism": 1,
        "Delay": 1000000000,
        "FailureAction": "pause",
        "Monitor": 15000000000,
        "MaxFailureRatio": 0.15
    },
    "EndpointSpec": {
        "Mode": "vip"
    }
}