class Solution {
public:
    unordered_map<string, bool> m;

    bool isSubsetSum(const vector<int>& arr, int sum, size_t start = 0) {
        if(sum == 0) return true;
        if(sum < 0 || start >= arr.size()) return false;
        string key = to_string(start) + "|" + to_string(sum);
        if(m.find(key) != m.end()) return m[key];
        if(isSubsetSum(arr, sum - arr[start], start + 1)) {
            m[key] = true;
            return true;
        }
        if(isSubsetSum(arr, sum, start + 1)) {
            m[key] = true;
            return true;
        }
        m[key] = false;
        return false;
    }
};
