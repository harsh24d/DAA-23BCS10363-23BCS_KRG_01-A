class Solution {
public:
    vector<int> dijkstra(int V, vector<vector<int>> &edges, int src) {
        vector<vector<pair<int,int>>> graph(V);
        for(vector<int> &e : edges) {
            graph[e[0]].push_back({e[1], e[2]});
            graph[e[1]].push_back({e[0], e[2]});
        }
        priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
        vector<int> distance(V, INT_MAX);
        distance[src] = 0;
        pq.push({0, src});
        while(!pq.empty()) {
            int u = pq.top().second; pq.pop();
            for(pair<int, int> &nei : graph[u]) {
                int v = nei.first;
                int w = nei.second;
                if(distance[u] + w < distance[v]) {
                    distance[v] = distance[u] + w;
                    pq.push({distance[v], v});
                }
            }
        }

        return distance;
    }
};
